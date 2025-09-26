import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const emp = [];

function showMenu() {
  console.log("\nEmployee Management System");
  console.log("1. Add Employees");
  console.log("2. List Employees");
  console.log("3. Remove Employees");
  console.log("4. Exit");
  rl.question("Enter your choice: ", handleInput);
}

function handleInput(choiceRaw) {
  const choice = String(choiceRaw).trim();

  switch (choice) {
    case "1":
      rl.question("Enter employee's name: ", (name) => {
        rl.question("Enter employee id: ", (id) => {
          emp.push({ id, name });
          console.log(`Employee ${name} (${id}) Added Successfully!!`);
          showMenu();
        });
      });
      break;

    case "2":
      console.log("\nEmployee List:");
      if (emp.length === 0) {
        console.log("No employees found.");
      } else {
        emp.forEach((employee, index) => {
          console.log(`${index + 1}. Name: ${employee.name} (ID: ${employee.id})`);
        });
      }
      showMenu();
      break;

    case "3":
      rl.question("Enter employee id to remove: ", (id) => {
        const index = emp.findIndex((e) => e.id === id);
        if (index !== -1) {
          const removed = emp.splice(index, 1)[0];
          console.log(`Employee ${removed.name} (ID:${id}) deleted successfully`);
        } else {
          console.log("No employee with this id");
        }
        showMenu();
      });
      break;

    case "4":
      console.log("Exit");
      rl.close();
      break;

    default:
      console.log("Invalid choice");
      showMenu();
  }
}

showMenu();
