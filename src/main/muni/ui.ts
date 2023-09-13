
type State = 'success' | 'failed' | 'undefined' | undefined

/**
 * Element das in späterer Folge im UI angezeigt wird
 */
export interface TestState {
    id?: string
    icon?: string
    state?: State,
    test?: string,
    message?: string
}

/**
 * Callback-Funktionen die bei setIndicatorTo aufgerufen werden können.
 */
interface FinalState {
    onError?: () => void
    onSuccess?: () => void
}

/**
 * Icon dass im Success-, Failed- oder Unknown- State angezeigt wird
 * @param state
 */
const stateSymbol = (state: State): string => {
    switch(state) {
        case 'failed':
            return 'highlight_off'
        case 'success':
            return 'check_circle_outline'
        default:
            return 'radio_button_unchecked'
    }
}

/**
 * Zeile die für den jeweiligen Test angelegt wird
 *
 * @param state
 */
export const appendState: ( state: TestState) => Promise<string> = async (state: TestState): Promise<string> => {
    const s4 = (): string => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    const id = s4() + s4()

    // {id, icon: stateSymbol(_state.state), ..._state})
    const ul = document.getElementById("munit") as HTMLUListElement

    const li = document.createElement("li")
    const status = document.createElement("span")
    const test = document.createElement("span")
    const message = document.createElement("span")

    status.classList.add("status", "material-icons")
    test.classList.add("testname")
    message.classList.add("message")

    //
    // const li = document.getElementById(state.id) as HTMLLIElement
    // const status = li.querySelector(".status")
    // const message = li.querySelector('.message')

    li!.classList.add(state.state ? state.state : 'undefined')

    status!.textContent = state.icon ? state.icon :stateSymbol(state.state)

    test!.textContent = state.test ? state.test : "<tc - undefined>"
    message!.textContent = state.message ?? "<M - undefined>"


    li.id = state.id ? state.id : id
    li.appendChild(status)
    li.appendChild(test)
    li.appendChild(message)

    ul.appendChild(li)

    return li.id
}

/**
 * Mit der in "appendState" generierten ID wird der Status am Ende des Tests gesetzt
 *
 * @param state
 */
export const setState: (state: TestState) => Promise<void> = async  ( state: TestState): Promise<void> => {
    // {...{ icon: stateSymbol(_state.state), state: 'undefined', test: '<undefinde>', message: "" },..._state})
    // const ul = document.getElementById("jest") as HTMLUListElement

    const li = document.getElementById(state.id ?? 'unknown') as HTMLLIElement
    const status = li.querySelector(".status")
    const message = li.querySelector('.message')

    status!.textContent = state.icon ?? stateSymbol(state.state)

    li!.classList.remove('undefined')
    li!.classList.add(state.state ?? 'undefined')

    message!.textContent = state.message ?? "No Message"
}

/**
 * Vor allen Tests wird der Title auf "Testing..." gesetzt
 */
export function resetIndicator(): void {
    document.title = "Testing..."
}

/**
 * Abhängig davon ob die Tests funktioniert haben oder nicht
 * werden einige UI-Elemente auf grün gesetzt.
 * Weiters wird auch der Title der Page angepasst.
 */
export function setIndicatorTo(state: 'success' | 'failed' | true | false, callbacks?: FinalState ): void {
    if(state === 'success' || state === true) {
        document.title = '✔ Tests were successful!'
        if(callbacks?.onSuccess) {
            callbacks?.onSuccess()
        } 

    } else {
        const div = document.getElementById("unit-tests") as HTMLDivElement
        const h1 = div.querySelector('h1') as HTMLHeadElement
        
        document.title = '✗ Tests failed!'

        h1.style.backgroundColor = '#ff0000'
        
        if(callbacks?.onError) {
            callbacks?.onError()
        }
    }
}
