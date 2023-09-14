import { appendState, setState } from './ui'

// type UnitTest<T> = { description: string, callback: () => Promise<T> }

// const tests: UnitTest<unknown>[] = []

/**
 * Zählt die Anzahl der fehlerhaften Tests
 */
export let errors: number = 0

/**
 * Test der ausgeführt werden soll
 *
 * @param description Beschreibung - diese Beschreibung wird schlussendlich im Browser angezeigt
 * @param callback Der Test...
 */
export async function test(description: string, callback: () => Promise<void>): Promise<void> {
    const id = await appendState( { test: description } )

    try {
        await callback()

        await setState( { id, state: 'success', message: "Success!" })
    } catch(e) {
        if( e instanceof Error ) {
            await setState( { id, state: 'failed', message: e.message })
        } else {
            await setState( { id, state: 'failed', message: `${e}` })
        }

        errors++

        // tslint:disable-next-line:no-console
        console.log(`\x1b[31m ✗ ${description} failed!`);
        // tslint:disable-next-line:no-console
        console.error(e);
    }
}

// export async function run(): Promise<void> {
//     await Promise.all(tests.map(async (unittest: UnitTest<unknown>) => {
//         try {
//             await unittest.callback()
//         } catch(e) {
//             // tslint:disable-next-line:no-console
//             console.log('\n');
//             // tslint:disable-next-line:no-console
//             console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + unittest.description);
//             // tslint:disable-next-line:no-console
//             console.error(e);
//         }
//     }))
//
// }

