import { configureStore, createSlice } from '@reduxjs/toolkit'

const displaySlice = createSlice({
    name: 'count',
    initialState: {
        display: '0',
        formula: '',
        isCalculated: false,
        eval: 0
    },
    reducers: {
        number: (state, action) => {
            if (state.display === '0' || state.isCalculated) {
                state.display = action.payload
                state.formula = action.payload
                state.isCalculated = false
            } else if (state.display.includes('/')
                    || state.display.includes('*')
                    || state.display.includes('-')
                    || state.display.includes('+')) {
                state.display = action.payload
                state.formula += action.payload
            } else {
                state.display += action.payload
                state.formula += action.payload
            }
        },
        clearState: (state) => {
            state.display = '0'
            state.formula = ''
        },
        operator: (state, action) => {
            if (state.isCalculated) {
                state.display = action.payload
                state.formula = state.eval + action.payload
                state.isCalculated = false
            }
            switch(action.payload) {
                case '/':
                case '*':
                case '-':
                case '+':
                    switch(state.formula[state.formula.length - 1]) {
                        case '/':
                        case '*':
                        case '-':
                        case '+':
                            if(/\d/.test(state.formula[state.formula.length - 2]) === false) {
                                console.log('hi')
                                state.formula = state.formula.slice(0,state.formula.length - 2) + action.payload
                                state.display = action.payload
                            }
                            if (action.payload === '-' && state.formula[state.formula.length - 2] !== '-') {
                                state.formula += action.payload
                                state.display = action.payload
                                break
                            }
                            state.formula = state.formula.slice(0, -1) + action.payload
                            state.display = action.payload
                            break
                        default:
                            state.formula += action.payload
                            state.display = action.payload
                    }
                    break
                case '.':
                    if (state.display.includes('.')) break
                    state.formula += action.payload
                    state.display += action.payload
                    break
                default:
                    state.formula += action.payload
                    state.display = action.payload
                    break
            }
        },
        equals: (state) => {
            if (!state.formula || state.display === 'NaN') {
                state.display = 'NaN'
                state.formula = '=NaN'
                state.isCalculated = true
            } else if (state.isCalculated) {
                return
            } else {
                const value = eval(state.formula.replace('--', '+'))
                state.eval = value
                state.formula += ` = ${value}`
                state.display = value
                state.isCalculated = true
            }
        }
    }
})

export const store = configureStore({
    reducer: {
        display: displaySlice.reducer
    }
})

export const { number, clearState, operator, equals } = displaySlice.actions