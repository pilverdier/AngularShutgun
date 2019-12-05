import { TestBed, async } from "@angular/core/testing";
import { FilterLift } from "./lift.filter";
import { User } from "../entities/user";
import { DataService } from '../data.service';

/*
What we want to test:

0.1 Return empty array if array of lifts is empty while searching specific value

1.0 Find lifts by searching destination
1.1 Find lifts by searching origin
1.2 Find lifts by searching availableSeats

2.0 Don't find lifts when searching for something not in array
2.1 Return all lifts when search is undefined -- WHAT?!?!?!?
2.2. Return all lifts when search is empty string

3.0 Search for destination but the data does not contain destination
3.1 Search for a negative number of seats
*/

const testData = [
  {_id: '3fdska',
  origin: 'Albertslund',
  destination: 'Gentofte',
  availableSeats: 4,
  departureTime: new Date(2019, 0, 1, 8, 0,0 ),
  owner: {_id: '21', firstName: 'Eric', lastName: 'Sørensen', email: 'eric@sørensen.dk'} as User },

  {_id: '2',
  origin: 'Hillerød',
  destination: 'Copenhagen',
  availableSeats: 5,
  departureTime: new Date(2019, 1, 1, 8, 0,0 ),
  owner: {_id: '1', firstName: 'Christian'} as User },

  {_id: '3',
  origin: 'Roskilde',
  destination: 'Copenhagen',
  availableSeats: 3,
  departureTime: new Date(2019, 1, 2, 9, 0,0 ),
  owner: {_id: '2', firstName: 'Simon'} as User }
];


describe("Lift Filter", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterLift]
    });
  });
  it("0.1 Return empty array if array of lifts is empty while searching specific value", () => {
    //Arrange: Have an instance of FilterList and an empty list

    const filter = new FilterLift();
    const data = [];
    const searchString = "Something";
    const expectedResult = []; //expect an empty result set

    //Act: Want to search for something
    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to expectedResult. An empty set
    expect(result).toEqual(expectedResult);
  });

  it("1.0 Find lifts by searching destination", () => {
    //Arange: Have an instance of FilterList and a populated list, a searchstring and an expected result

    const filter = new FilterLift();
    const data = (new DataService).tempData; //Imports the temp data from our Data Service to use as temp data
    // const data = testData; //Could use this instead as we wouldn't have to venture out of the class for data!
    const searchString = "Gentofte";

    const expectedResult = [
      {
        _id: "3fdska",
        origin: "Albertslund",
        destination: "Gentofte",
        availableSeats: 4,
        departureTime: new Date(2019, 0, 1, 8, 0, 0),
        owner: {
          _id: "21",
          firstName: "Eric",
          lastName: "Sørensen",
          email: "eric@sørensen.dk"
        } as User
      }
    ];

    //Act: We want to search for destination = Gentofte
    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to expected result.
    expect(result).toEqual(expectedResult);
  });

  it('1.1 Find lifts by searching origin', () =>{

    //Arrange: We want a filter and data to search, a search string and an expected result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchString = 'Hillerød';
    const expectedResult = [{_id: '2',
    origin: 'Hillerød',
    destination: 'Copenhagen',
    availableSeats: 5,
    departureTime: new Date(2019, 1, 1, 8, 0,0 ),
    owner: {_id: '1', firstName: 'Christian'} as User }]

    // Act: we want to search for origin: Hillerød

    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to expected result.

    expect(result).toEqual(expectedResult)
  });

  it('1.2 Find lifts by searching availableSeats', () =>{

    //Arrange: We want a filter, data to search, a search string and an expected result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchstring = "5";
    const expectedResult = [{_id: '2',
    origin: 'Hillerød',
    destination: 'Copenhagen',
    availableSeats: 5,
    departureTime: new Date(2019, 1, 1, 8, 0,0 ),
    owner: {_id: '1', firstName: 'Christian'} as User }
    ]

    //Act: We want to search for availableseats to be equal to or larger than 5
    const result = filter.transform(data, searchstring);

    //Assert: We want it to be equal to the expected result.

    expect(result).toEqual(expectedResult);
  })
  it('2.0 Don\'t find lifts when searching for something not in array', () => {

    //Arrange we want a filter, data to search, a search string and an expected (empt) result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchString='Somethingimpossible'
    const expectedResult = []

    //Act we want to search for an impossible search string, ensuring that we receive nothing in return
    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to the expected result

    expect(result).toEqual(expectedResult);
  })
  it('2.1 Return all lifts when search is undefined ', () =>{
    //Arrange we want a filter, data to search, a search string and an expected (full) result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchString = undefined;
    const expectedResult = data;

    //Act we want to search for an undefined string, ensuring that if done so all data is returned

    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to the expected result

    expect(result).toEqual(expectedResult);
  })
  it('2.2 Return all lifts when search is empty string', () =>{

    //Arrange: We want a filter, data to search, a search string and an expected result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchString = "";
    const expectedResult = data;

    //Act: We want to show the entire data set when search string is empty
    const result = filter.transform(data, searchString);

    //Assert: We want it to be equal to the expected result

    expect(result).toEqual(expectedResult);
  });
  it('3.0 Search for destination but the data does not contain destination', () =>{

    //Arrange we want a filter, a dataset to search through, a search string and an expected result

    const filter = new FilterLift();
    const data = (new DataService()).tempData;

    const searchString = 'Langtbortistan'; //should not be a used destination...
    const expectedResult = [] //...Which should return an empty set of results

    //Act: We want the returned data set to be empty, because we search for a destination not contained within our database
    const result = filter.transform(data, searchString);

    //Assert We want it to be equal to the expected result
    expect(result).toEqual(expectedResult);
  })
  it('3.1 Search for a negative number of seats', () => {

    //Arrange we want a filter, a dataset to search through, a search string and an expected result
    const filter = new FilterLift();
    const data = (new DataService).tempData;

    const searchString = '-3';
    const expectedResult = data;

    //Act: We want the returned data set to return the entire data set, since all available seats should be higher than -3 (e.g. 3 > -3)
    const result = filter.transform(data, searchString);

    //Assert we want it to be equal to the expected result
    expect(result).toEqual(expectedResult)
  });
});
