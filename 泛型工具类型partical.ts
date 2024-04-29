interface Props{
    id:string
    children:number[]
}
// 将所有的属性“可选”:partial，生成一个新的类型
type pProps=Partial<Props>
// 将所有的属性“只读”:readonly，生成一个新的类型
type roProps = Readonly<Props>
const obj:roProps={
    id:'1',
    children:[1,2,3]
}
// obj.id='2'
// 取某些属性pick，生成一个新的类型
interface NProps{
    id: string
    children: number[]
    title:string
}
type pickNProps = Pick<NProps, 'id' | 'title'>//取id与title
const obj2:pickNProps={
    id:'1',
    title:'2'
}
// 与其它类型无关。单纯生成一个类型，<keys,typeof keys>
type recProps=Record<'id' | 'title',string>//{id:string,title:string}
const obj3:recProps={
    id:'1',
    title:'2'
}