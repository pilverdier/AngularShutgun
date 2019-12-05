import { browser, element, by } from "protractor";
import { protractor } from 'protractor/built/ptor';
import { AppPage } from './app.po';

describe('Register tests', () =>{
  let page: AppPage;
  beforeEach(() =>{
    page = new AppPage();
  });

  /*Tests to run

  Expect register form to be present when on the page

  Expect register to show validation error when inputting wrong info

  Expect register to succeed route to new component when all inputs are correct

  */
  it('1.0 Should show the register form when on the register path', ()=>{

    //start by accessing the register component
    browser.get('');
    element(by.id('home-register')).click();

    //Check whether the form is present
    expect(element(by.id('registerForm')).isDisplayed)
  })


  it('2.0 Should show validation errors when wrong inputs are used', () =>{


    //Feed the wrong information into form
    element(by.id("register-firstName")).sendKeys("")
    element(by.id("register-lastName")).sendKeys("")
    element(by.id("register-eMail")).sendKeys(" ") //won't check for proper email unless something has been written
    element(by.id("register-password")).sendKeys("")
    element(by.id("register-city")).sendKeys("")
    element(by.id("register-birthDate")).sendKeys(" ")
    element(by.id("register-phoneNumber")).sendKeys("") + protractor.Key.TAB

    //Check for validation errors
    element.all(by.css('.register-validationError')).then((el2) => {
      const amount = el2.length;

      expect(amount).toEqual(7);
    });
    });

    it('3.0 should show the "thanks" page when form is succesfully submitted', () =>{

      //First clear the information from last test to ensure clean slate

      element(by.id("register-firstName")).clear
      element(by.id("register-lastName")).clear
      element(by.id("register-eMail")).clear
      element(by.id("register-password")).clear
      element(by.id("register-city")).clear
      element(by.id("register-birthDate")).clear
      element(by.id("register-phoneNumber")).clear

      //Then feeding in correct information
      element(by.id("register-firstName")).sendKeys("Firstname")
      element(by.id("register-lastName")).sendKeys("Lastname")
      element(by.id("register-eMail")).sendKeys("Firstname@Lastname.dk") //won't check for proper email unless something has been written
      element(by.id("register-password")).sendKeys("12345678")
      element(by.id("register-city")).sendKeys("Somewhere")
      element(by.id("register-birthDate")).sendKeys('22-10-2019' + protractor.Key.TAB + '10-05'); //Done this way due to browser datepicker
      element(by.id("register-phoneNumber")).sendKeys("12345678")

      element(by.id("register-submit")).click

      //Expect the thanks page to be displayed

      expect(element(by.id("thanks-message")).isDisplayed)
  });

});
