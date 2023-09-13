# MUni - Microframework for Unit-Test in your browser
> Lightweight TS library for unit-testing

## Installation

    yarn add -D @mmit/muni

## Usage

### Step I - write your Tests
```typescript
import { test} from '@mmit/muni'
import { expect } from 'chai'

export async function testMUni(): Promise<void> {

    await test('MUNI - Basics', async (): Promise<void> => {
        // tslint:disable-next-line:no-unused-expression
        expect(true, 'Value should be true').to.be.true
    })

    await test('MUNI - Expect Exception', async (): Promise<void> => {
        // tslint:disable-next-line:no-unused-expression
        expect(():void => { throw new Error("Test") }, 'Expected an Exception...').to.throw()
    })

}
```
     
### Step II - add this snippet in your HTML-Page
```html
<div id="unit-tests">
    <h1>MUnit / Browser-Tests</h1>
    <ul id="munit">
        <!-- Unit-Tests -->
    </ul>
</div>
```

### Step III - add this snippet to your main SCSS
```scss
@import "~@mmit/muni/css/muni.css";
```

### Step IV - run your Tests!
```typescript
import * as muni from '@mmit/muni'

export async function main(): Promise<void> {
    muni.resetIndicator()

    await Promise.all([
        await testMUni(),
    ])

    muni.setIndicatorTo(muni.errors === 0, { onError: (): void => {
        console.error(`Unit-Tests failed with #${muni.errors} error(s)!`)
    }})

}

```

For more examples - pls check out my [Tests](https://github.com/MikeMitterer/ts-muni/tree/master/src/browser)

## Bugs / Contribute

You reach me via [GH - Issues](https://github.com/MikeMitterer/ts-validate/issues)

Help is always welcome!

## License

    MIT License

    Copyright (c) 2021, Mike Mitterer <office@mikemitterer.at>

    Mike Mitterer: http://www.MikeMitterer.at/

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
