import { test } from '../../main/muni'
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
