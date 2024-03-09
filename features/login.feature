@sanity @noauth
Feature: Login Functionality

  Background: I am on the Login Page
    Given I am on the Login Page
  
  Scenario Outline: Verify that I can log in to the Proposify Dashboard with valid credentials
    When I enter my email address as "<email>"
    And I enter my password as "<password>"
    When I click on the Login button
    Then I am directed to the Proposify Dashboard Page
    # And I click on the Beta Editor page

    Examples: 
      | email                     | password    |
      | olaoyechristy97@gmail.com | Ememobong@95 |

 