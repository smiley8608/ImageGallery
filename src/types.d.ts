
interface InitialStateProps {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string
}

interface UpdatedInitialProps {
    User:InitialStateProps |null,
    Auth:boolean
}

interface Imagetype {
    _id: string
    path:string,
    email:string,
    username:string,
    __v: number
}
interface UpdatedImagetype {
    Image:Imagetype[]|null
}