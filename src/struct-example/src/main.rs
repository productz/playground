#[derive(Debug)]
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

impl User{
    fn salary(&self) -> u32 {
        println!("Referenced self is: {:?}",self);
        return 32 * 32;
    }
}

fn main() {
    let user1 = User {
        email: String::from("someone@example.com"),
        username: String::from("someusername123"),
        active: true,
        sign_in_count: 1,
    };
    let user2 = build_user(String::from("osamah.nt.m@gmail.com"),String::from("javasop"));

    //update syntax
    let user3 = User {
        email: String::from("another@example.com"),
        username: String::from("anotherusername567"),
        ..user1
    };
    println!("Salary is : {:?}",user3.salary());
}

fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}

