/// <reference types="cypress" />
/// <reference types="node" />

// Archived: moved from active API helpers to archive after refactor to inline requests in steps.
// Kept for historical reference in case we want to restore helper functions.

import { Board } from '../types/trello';

const BASE = 'https://api.trello.com/1';

function creds() {
  const key = Cypress.env('TRELLO_KEY') || (typeof process !== 'undefined' ? process.env.TRELLO_KEY : undefined);
  const token = Cypress.env('TRELLO_TOKEN') || (typeof process !== 'undefined' ? process.env.TRELLO_TOKEN : undefined);
  if (!key || !token) {
    throw new Error('TRELLO_KEY and TRELLO_TOKEN must be set in Cypress env or process.env');
  }
  return { key, token };
}

export function createBoard(boardData: Partial<Board>): Cypress.Chainable<any> {
  const { key, token } = creds();
  const qs: Record<string, any> = { key, token };
  if (boardData.name) qs.name = boardData.name;
  return cy.request({ method: 'POST', url: `${BASE}/boards`, qs, failOnStatusCode: true }).then((resp: any) => resp.body);
}

export function getBoard(id: string, fields = 'name,desc'): Cypress.Chainable<any> {
  const { key, token } = creds();
  return cy.request({ method: 'GET', url: `${BASE}/boards/${id}`, qs: { key, token, fields }, failOnStatusCode: true }).then((resp: any) => resp.body);
}

export function updateBoard(id: string, update: Partial<Board>): Cypress.Chainable<any> {
  const { key, token } = creds();
  return cy.request({ method: 'PUT', url: `${BASE}/boards/${id}`, qs: { key, token }, body: update, failOnStatusCode: true }).then((resp: any) => resp.body);
}

export function deleteBoard(id: string): Cypress.Chainable<any> {
  const { key, token } = creds();
  return cy.request({ method: 'DELETE', url: `${BASE}/boards/${id}`, qs: { key, token }, failOnStatusCode: true }).then((resp: any) => resp.body);
}

export function getBoardField(id: string, field: string): Cypress.Chainable<any> {
  const { key, token } = creds();
  return cy.request({ method: 'GET', url: `${BASE}/boards/${id}/${field}`, qs: { key, token }, failOnStatusCode: false }).then((resp: any) => {
    const body = resp.body;
    if (resp.status === 404 || body === '' || body === null) return { _value: null };
    if (typeof body === 'string') {
      const trimmed = body.trim();
      if (trimmed === 'null') return { _value: null };
      return { _value: trimmed };
    }
    if (typeof body === 'object') {
      if ('_value' in body) return body;
      return { _value: body };
    }
    return { _value: body };
  });
}

export class TrelloClient {
  private baseUrl: string;
  private apiKey: string;
  private token: string;

  constructor(apiKey: string, token: string) {
    this.baseUrl = 'https://api.trello.com/1';
    this.apiKey = apiKey;
    this.token = token;
  }

  private async request(method: string, endpoint: string, body?: any) {
    const url = `${this.baseUrl}${endpoint}?key=${this.apiKey}&token=${this.token}`;
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    };
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
    return response.json();
  }

  public getBoards() {
    return this.request('GET', '/boards');
  }

  public createBoard(name: string) {
    return this.request('POST', '/boards', { name });
  }

  public updateBoard(boardId: string, updates: any) {
    return this.request('PUT', `/boards/${boardId}`, updates);
  }

  public deleteBoard(boardId: string) {
    return this.request('DELETE', `/boards/${boardId}`);
  }
}
