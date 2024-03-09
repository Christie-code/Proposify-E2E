Feature: Document Management

  Background: Navigation
    Given I navigate to the dashboard
    And I am on the New Beta Editor page
    When I click on New Document
    And I return to the Beta Editor page

  Scenario: Verify Documents Draft Filter and Trash
    Then I should see a filter bar
    When I click on the Draft filter
    Then The document created should be shown with the status Draft
    When I navigate to the trash
    And I empty the trash
