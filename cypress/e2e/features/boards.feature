Feature: Trello Boards CRUD Operations
  
  Scenario: Create a new board
    Given I have a valid API key and token
    When I create a board with the name "my-dummy-qa-test-board"
    Then I should receive a response with status 200
    And the response should contain the board id and name "my-dummy-qa-test-board"
 
  Scenario: Retrieve an existing board
    Given I have a valid API key and token
    And the previously created board exists
    When I retrieve the previously created board
    Then I should receive a response with status 200
    And the response should contain the same id and name as the stored board

  Scenario: Update a board
    Given I have a valid API key and token
    And the previously created board exists
    When I update the previously created board name to "not-so-dummy-board"
    Then I should receive a response with status 200
    And the response should contain the updated board name "not-so-dummy-board"

  Scenario: Delete a board
    Given I have a valid API key and token
    And the previously created board exists
    When I delete the previously created board
    Then the board should no longer exist