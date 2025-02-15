
type User = { id: number; name: string; age: number }
let data: User[] = [
    { id: 1, name: "Aarav Mehta", age: 25 },
    { id: 2, name: "Ishaan Sharma", age: 30 },
    { id: 3, name: "Neha Verma", age: 22 },
    { id: 4, name: "Riya Kapoor", age: 28 },
    { id: 5, name: "Ananya Singh", age: 26 },
    { id: 6, name: "Kabir Khanna", age: 27 },
    { id: 7, name: "Rohan Joshi", age: 29 },
    { id: 8, name: "Sanya Patel", age: 24 },
    { id: 9, name: "Vikram Malhotra", age: 31 },
    { id: 10, name: "Mira Das", age: 23 },
    { id: 11, name: "Aditya Nair", age: 32 },
    { id: 12, name: "Simran Kaur", age: 25 },
    { id: 13, name: "Tushar Saxena", age: 28 },
    { id: 14, name: "Priya Choudhary", age: 26 },
    { id: 15, name: "Devang Desai", age: 30 }
];

export function getLength(){
    return data.length
}

export function addUser(user: User) {
    data.push(user)
    return Promise.resolve("sdf");
}
export function getUser():User[] {
    return data
}
export function deleteUser(id:number) {
    data = data.filter((user)=>user.id!=id)
}
