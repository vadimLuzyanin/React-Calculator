import { create, all } from 'mathjs'
import { useState } from 'react';

const useInputLogic = (setInputChar) => {

    const config = {
        epsilon: 1e-12,
        matrix: 'Matrix',
        number: 'number',
        precision: 100,
        predictable: false,
        randomSeed: null
    };

    const math = create(all, config)

    const [inputState, setInputState] = useState('')

    const [bracketsL, setBracketsL] = useState(0)
    const [bracketsR, setBracketsR] = useState(0)

    const [history, setHistory] = useState([])

    const handlePress = (keyForLogic) => {
        handleInput(keyForLogic)
    }

    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const operations = ['+', '-', '*', '/'];
    const dots = ['.', ',']
    const brackets = ['(', ')']
    const autochange = [...operations, ...dots]
    const numbersAndBrackets = [...numbers, ...brackets]
    const operationsAndDots = [...operations, ...dots]
    const operationsAndBrackets = [...operations, ...brackets]

    const lastChar = inputState[inputState.length - 1]
    const beforeLastChar = inputState[inputState.length - 2]

    const isDotAllowed = () => {
        if (operations.every((op) => inputState.lastIndexOf('.') > inputState.lastIndexOf(op)) || !numbers.includes(lastChar)) {
            return false;
        } else {
            return true;
        }
    }

    const handlePasteFromHistory = (value) => {
        if (inputState.length === 0 || operations.includes(lastChar) || lastChar === '(') {
            setInputState((prev) => `${prev}${value}`)

        } else if (value === '0' || value === 'Infinity' || value === 'NaN') {
            return

        } else if (inputState === '0' || inputState === 'Infinity' || inputState === 'NaN') {
            setInputState(value)

        } else {
            setInputState((prev) => `${prev}*${value}`)
            setBracketsL(0)
            setBracketsR(0)
        }
    }

    const handleInput = (key) => {
        if (key === 'Enter') key = '='
        if (key === ',' ) key = '.'
        
        setInputChar(key)

        if (numbers.includes(key)) {

            if (inputState === '0' || inputState === 'Infinity' || inputState === 'NaN') {
                setInputState(key)

            } else if (lastChar === '0' && operationsAndBrackets.includes(beforeLastChar)) {
                setInputState((prev) => prev.slice(0, prev.length - 1) + key)

            } else {
                setInputState((prev) => prev + key)
            }

        } else if (operations.includes(key)) {

            if (inputState.length === 0 || inputState === 'Infinity' || inputState === 'NaN') {
                setInputState('')

            } else if (key === '-' && lastChar === '(') {
                setInputState((prev) => prev + key)

            } else if (lastChar === '(') {
                setInputState((prev) => prev)

            } else if (autochange.includes((lastChar))) {
                setInputState((prev) => prev.slice(0, prev.length - 1) + key)

            } else {
                setInputState((prev) => prev + key)
            }

        } else if (dots.includes(key)) {
            if (autochange.includes(lastChar)) {
                setInputState((prev) => prev.slice(0, prev.length - 1) + '.')

            }

            if (isDotAllowed()) {
                setInputState((prev) => prev + '.')
            }

        } else if (brackets.includes(key)) {

            if (key === '(') {

                if (brackets.includes(lastChar) || inputState.length === 0) {
                    setBracketsL((L) => L + 1)
                    setInputState((prev) => prev + key)

                } else if (!operationsAndDots.includes(lastChar)) {
                    setBracketsL((L) => L + 1)
                    setInputState((prev) => prev + '*' + key)

                } else if (operations.includes(lastChar) || inputState.length === 0) {
                    setBracketsL((L) => L + 1)
                    setInputState((prev) => prev + key)

                }
            } else if (key === ')') {

                if (bracketsL > bracketsR && lastChar === ')') {
                    setBracketsR((R) => R + 1)
                    setInputState((prev) => prev + key)

                } else if (bracketsL > bracketsR && numbers.includes(lastChar)) {
                    setBracketsR((R) => R + 1)
                    setInputState((prev) => prev + key)
                }

            }

        } else if (key === '+/-') {
            if (operationsAndBrackets.every((item) => !inputState.includes(item))) {

                if (inputState[0] !== '-') {
                    setInputState((prev) => '-' + prev)

                }

            } else if (inputState[0] === '-') {
                setInputState((prev) => prev.slice(1))

            }

        } else if (key === 'Backspace') {
            if (inputState.slice) {
                if (brackets.includes(lastChar)) {

                    if (lastChar === '(') setBracketsL((L) => L - 1)

                    else if (lastChar === ')') setBracketsR((R) => R - 1)

                }
                setInputState((prev) => prev.slice(0, prev.length - 1))
            }

        } else if (key === 'Delete') {
            setInputState('')
            setBracketsL(0)
            setBracketsR(0)

        } else if (key === '=' || key === 'Enter') {

            if (bracketsL === bracketsR && inputState && numbersAndBrackets.includes(lastChar)) {
                const result = (math.evaluate(inputState)).toString();

                setHistory((prev) => [...prev, [inputState, result]]) //[[state: res] [state:res]]

                setInputState(result)

            } 
        }
    }

    return [inputState, handlePress, history, handlePasteFromHistory]
}

export default useInputLogic