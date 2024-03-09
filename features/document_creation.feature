Feature: Document Management

  Background: Navigation
    Given I navigate to the dashboard
    And I am on the New Beta Editor page 

  Scenario: Upload Images to Document Library
    When I click on New Document
    And I click on the content tab
    When I click on the Image Block
    Then I upload "<imageFiles>" as images

    Examples: 
      | imageFiles                                   |
      | assets/testImage1.png, assets/testImage2.jpg |

  Scenario: Add a signature block to a new document
    When I click on New Document
    And I click on the Signatures tab
    Then I should see a signature block
    And I drag the signature block to the right edge of the document
