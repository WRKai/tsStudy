type If<C, T, F> = C extends true ? T : F

type a = If<true, 'a', 'b'> // expected to be 'a'
type b = If<undefined, 'a', 'b'> // expected to be 'a'

const obj = {
    true: true
}