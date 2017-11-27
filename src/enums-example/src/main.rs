#[derive(Debug)] // So we can inspect the state in a minute
enum UsState {
    Alabama,
    Alaska,
    // ... etc
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        },
    }
}

fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let some_number = Some(5);
    let absent_number: Option<i32> = None;
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    let some_u8_value = Some(0);
    if let Some(3) = some_u8_value {
        println!("three");
    }else{
        println!("not three");
    }
    println!("Hello, world! {:?}",absent_number);
    println!("six with some value {:?}",six);
}
