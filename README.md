
## Installation 

```javascript
npm install generator_username_random --save 

yarn add generator_username_random
```

- Importing

```javascript
// Using Node.js `require()`
const { generate_from_email, generate_from_username } = require("generator_username_random");

// Using ES6 imports
import { generate_from_email, generate_from_email } from "generator_username_random";
```



## usege 

It will generate a username from the email and you can add up to six random digits to the end of the name.

```javascript
// add three random digits
const username = generate_from_email(
  "naruto.uzumaki@example.com",
  3
);
console.log(username); // narutouzumaki154

// add four random digits
const username = generate_from_email(
  "naruto.uzumaki@example.com",
  4
);
console.log(username); // narutouzumaki1544
```


### Randomly generate unique username.

It will generate unique username from adjectives, nouns, random digits and separator. You can control these following parameters - separator, number of random digits and maximum length of a username.

```javascript
// generate_from_username(separator, number of random digits, maximum length)

// Without any parameter
const username = generate_from_username();
console.log(username); // kiko-vecino

// With any separator like "-, _"
const username = generate_from_username("-");
console.log(username); // kiko-vecino

// With random digits and no separator
const username = generate_from_username("", 3);
console.log(username); // kiko-vecino732

// With maximum length constraint and no separator, no random digits
const username = generate_from_username("", 0, 15);
console.log(username); // kiko-vecino

// With maximum length constraint and separator but no random digits
const username = generate_from_username("-", 0, 15);
console.log(username); // kiko-vecino

// With maximum length constraint and random digits but no separator
const username = generate_from_username("", 2, 19);
console.log(username); // kiko-vecinol73

// With all parameters
const username = generate_from_username("-", 2, 20, 'naruto uzumaki');
console.log(username); // naruto-uzumaki-73
```


### Default dictionaries

By default, the unique username generator library comes with 2 dictionaries out of the box, so that you can use them straight away.

The new syntax for using the default dictionaries is the following:

```javascript
import { uniqueUsernameGenerator, Config, adjectives, substantives } from 'generator_username_random';

const config: Config = {
  dictionaries: [adjectives, substantives]
}

const username: string = generate_from_username_unique(config); // narutouzumaki
```


### Custom dictionaries

You might want to provide your custom dictionaries to use for generating your unique username, in order to meet your project requirements. You can easily do that using the dictionaries option.

```javascript
import { generate_from_username_unique } from 'generator_username_random';

const marvelCharacters = [
  'Iron Man',
  'Doctor Strange',
  'Hulk',
  'Captain America',
  'Thanos'
];

const config: Config = {
  dictionaries: [marvelCharacters],
  separator: '',
  style: 'capital',
  randomDigits: 3
}

const username: string = generate_from_username_unique(config); // Hulk123
```

### UUID


```javascript
import { validate_uuid } from 'generator_username_random';

const validate = validate_uuid('84108d0b-65cf-4a74-b7e1-1fcb806e53b8'); // true
const validate = validate_uuid('84108d0b-65cf-4a74-b7e1-1fcb806e53b{}'); // false

```

```javascript
import { generate_uuid_v4 } from 'generator_username_random';

const uuid = generate_uuid_v4(); // 'cf7a1f8a-e1a4-4ac9-b9aa-a92c48f9d37a'

```


## API

### generate_from_username_unique (options)
Returns a `string` with a random generated username

### options

Type: `Config`

The `options` argument mostly corresponds to the properties defined for uniqueUsernameGenerator. Only `dictionaries` is required.


| Option       | Type                                | Description                                                                                                                                                                                                                                                                         | Default value | Example value                                                                                                                                                                                                           |
|--------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dictionaries | `array`                             | This is an array of dictionaries. Each dictionary is an array of strings containing the words to use for generating the string.<br>The provided dictionaries can be imported from the library as a separate modules and provided in the desired order.                              | n/a           | <br>```import { generate_from_username_unique, adjectives, substantives } from 'generator_username_random';```<br>```const username: string = generate_from_username_unique({ dictionaries: [substantives, adjectives]}); // narutouzumaki``` |
| separator    | `string`                            | A string separator to be used for separate the words generated. The default separator is set to be empty string.                                                                                                                                                                    | ""            | `-`                                                                                                                                                                                                                     |
| randomDigits | `number`                            | A number of random digits to add at the end of a username.                                                                                                                                                                                                                          | 0             | `3`                                                                                                                                                                                                                     |
| length       | `number`                            | A maximum length of a username                                                                                                                                                                                                                                                      | 15            | `12`                                                                                                                                                                                                                    |
| style        | `lowerCase \| upperCase \| capital` | The default value is set to `lowerCase` and it will return a lower case username.<br>By setting the value to `upperCase`, the words, will be returned with all the letters in upper case format.<br>The `capital` option will capitalize each word of the unique username generated | lowerCase     | `lowerCase`                                                                                                                                                                                                             |




## License

The MIT License.