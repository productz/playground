fn print_me(msg: &str) { println!("msg = {}", msg); }

fn main() {
    let string = "hello world";
    print_me(string);

    let owned_string = "hello world".to_string(); // or String::from_str("hello world")
    print_me(&owned_string);

    //conditionals
    let condition = true;
    let number = if condition {
        5
    } else {
        6
    };

    //for loops
    let a = [10, 20, 30, 40, 50];

    for element in a.iter() {
        println!("the value is: {}", element);
    }

    //range
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");

    println!("The value of number is: {}", number);

}