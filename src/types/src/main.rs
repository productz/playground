fn change_me(mut msg: String) -> String {
    msg = "new msg".to_string();
    println!("Owned string is {}",msg);
    return msg;
}

fn main() {
    // let string = "hello world";
    // print_me(string);
    let mut owned_string = "hello world".to_string(); // or String::from_str("hello world")
    owned_string = change_me(owned_string);
    println!("Owned string 2 is {}",owned_string);

    //conditionals
    // let condition = true;
    // let number = if condition {
    //     5
    // } else {
    //     6
    // };

    // //for loops
    // let a = [10, 20, 30, 40, 50];

    // for element in a.iter() {
    //     println!("the value is: {}", element);
    // }

    // //range
    // for number in (1..4).rev() {
    //     println!("{}!", number);
    // }
    // println!("LIFTOFF!!!");

    // println!("The value of number is: {}", number);

}