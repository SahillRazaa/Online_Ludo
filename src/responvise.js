import {css} from 'styled-components'

export const screen1 = (props) => {
    return css`
        @media only screen and (max-width: 1200px) {
            ${props};
        }
    `
}

export const screen2 = (props) => {
    return css`
        @media only screen and (max-width: 800px) {
            ${props};
        }
    `
}

export const screen3 = (props) => {
    return css`
        @media only screen and (max-width: 540px) {
            ${props};
        }
    `
}

export const screen4 = (props) => {
    return css`
        @media only screen and (max-width: 420px) {
            ${props};
        }
    `
}
