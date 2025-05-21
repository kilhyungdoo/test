# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a simple Node.js calculator application that performs basic arithmetic operations (addition, subtraction, multiplication, and division) via command line interface or interactive mode. The application consists of:

- `calculator.js`: Main application file containing arithmetic functions and both CLI and interactive interfaces
- Test suite in the `test` directory

## Common Commands

### Running the Application

#### Command Line Interface Mode:
```bash
node calculator.js <number1> <operator> <number2>
```

Example:
```bash
node calculator.js 5 + 3
```

Valid operators: `+` (addition), `-` (subtraction), `*` (multiplication), `/` (division)

#### Interactive Mode:
```bash
node calculator.js
```
Then follow the prompts to select an operation and input numbers.

### Running Tests

Run all tests:
```bash
npm test
```

## Code Structure

The codebase has a simple structure:

1. `calculator.js`: 
   - Contains four arithmetic functions (add, subtract, multiply, divide)
   - Handles both command-line arguments and interactive mode
   - Uses readline for interactive user input

2. `test/calculator.test.js`: 
   - Contains test suite for command-line mode only
   - Uses child_process to spawn calculator process and validate outputs

3. `test/run_tests.sh`: 
   - Shell script for test execution
   - Provides usage instructions after tests complete

### Testing Approach

The tests are organized by test ID with the following patterns:
- `T-00X`: Basic functionality tests for command-line arithmetic operations
- `T-10X`: Error handling tests for command-line mode
- `T-20X`: Edge case tests for command-line mode (floating point, negative numbers, etc.)

### Implementation Notes

- The interactive mode uses readline interface for user input
- Error handling includes checking for division by zero, invalid numbers, and invalid operators
- The application supports both command-line arguments and interactive modes in a single file
- Exit codes are set explicitly to ensure compatibility with the test suite