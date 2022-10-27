
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