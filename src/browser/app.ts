import { LoggerFactory } from '@mmit/logging'
import { testMUni } from './tests/muni.e2e'
import * as muni from '../main/muni/'

const query = (selector: string): HTMLElement => document.querySelector(selector) as HTMLElement;

export async function main(): Promise<void> {
    // Retrieve a logger (you can decide to use it per class and/or module or just
    // export it in the config above etc. Your loggers - your choice!).
    // This logger will fall in the first LogGroupRule from above.
    const logger = LoggerFactory.getLogger('main');

    muni.resetIndicator()

    await Promise.all([
        await testMUni(),
    ])

    muni.setIndicatorTo(muni.errors === 0, { onError: (): void => {
        logger.error(`Unit-Tests failed with #${muni.errors} error(s)!`)
    }})

    testHTML();

    // logger.info(`Done!!!! ${os.platform()}`);
    logger.info(`Done!!!!`);
}

function testHTML(): void {
    const logger = LoggerFactory.getLogger('main');

    query('#tstest').onclick = (event: MouseEvent): void => {
        alert(`Hi Mike, event '${event.type}' occurred!!`);
    };

    const divs = Array.from(document.getElementsByTagName('div'));

    divs.forEach((div: HTMLDivElement): void => {
        div.addEventListener('click', (evt: MouseEvent): void => {
            evt = new MouseEvent('aaa');
            logger.info(JSON.stringify(evt));
        });
    });

    const body = query('body') as HTMLBodyElement;
    body.classList.remove('loading');
    body.classList.add('loaded');
}
