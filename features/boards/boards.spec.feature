@boards
Feature: Trello Boards
  As an API consumer
  I want to manage Trello boards
  So I can create, retrieve, update and delete them through the REST API

  Background:
    Given the consumer is an authorized user

  Scenario: Create a new board
    When the consumer creates a board named "my-dummy-qa-test-board"
    Then the boards service should succeed with the status code ok
    And the board response should contain the id and the name "my-dummy-qa-test-board"

  Scenario: Retrieve an existing board
    Given an existing board
    When the consumer retrieves the board
    Then the boards service should succeed with the status code ok
    And the board response should match the stored board

  Scenario: Update a board
    Given an existing board
    When the consumer updates the board name to "not-so-dummy-board"
    Then the boards service should succeed with the status code ok
    And the board response should contain the name "not-so-dummy-board"

  Scenario: Delete a board
    Given an existing board
    When the consumer deletes the board
    Then the boards service should succeed with the status code ok
    And the board should no longer exist

  Scenario: Create a board without a name
    When the consumer creates a board without a name
    Then the boards service should fail with the status code bad_request
    And the error response contains the message: "invalid value for name"

  Scenario: Create a board without a token
    Given the consumer provides the key only
    When the consumer creates a board without a token
    Then the boards service should fail with the status code unauthorized
    And the error response contains the message: "missing scopes"

  Scenario: Create a board without a key
    Given the consumer provides the token only
    When the consumer creates a board without a key
    Then the boards service should fail with the status code unauthorized
    And the error response contains the message: "invalid key"
