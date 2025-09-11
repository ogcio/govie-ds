import { faker } from '@faker-js/faker';

faker.seed(1234);

export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  isActive: boolean;
  status: 'pending' | 'in progress' | 'accepted' | 'declined';
  disabledFields?: string[];
};

const range = (length_: number) => {
  const array: number[] = [];
  for (let index = 0; index < length_; index++) {
    array.push(index);
  }
  return array;
};

const createRandomCitizen = (): Person => {
  const allFields = ['firstName', 'age', 'city', 'email', 'status', 'isActive'];
  const disabledFields = [
    ...new Set([
      allFields[Math.floor(Math.random() * allFields.length)],
      allFields[Math.floor(Math.random() * allFields.length)],
    ]),
  ];
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 90 }),
    city: faker.location.city(),
    isActive: !!faker.number.int({ min: 0, max: 1 }),
    status: faker.helpers.shuffle<Person['status']>([
      'pending',
      'in progress',
      'accepted',
      'declined',
    ])[0]!,
    disabledFields,
  };
};

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const length_ = lens[depth]!;
    return range(length_).map((): Person => {
      return {
        ...createRandomCitizen(),
      };
    });
  };

  return makeDataLevel();
}
