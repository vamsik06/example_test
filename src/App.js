import React, { useState, useEffect } from 'react';

const TestNGSimulation = () => {
  const [testStatus, setTestStatus] = useState([]); // Keeps track of the test statuses dynamically
  const [isRetrying, setIsRetrying] = useState(false); // Track if a test is retrying
  const [finalStatus, setFinalStatus] = useState(''); // Final test status (all tests completed)
  const [passedTests, setPassedTests] = useState(new Set()); // Keep track of passed tests

  const tests = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];

  // Function to simulate running a single test
  const runTest = async (testName, index) => {
    // If the test is already passed, skip it
    if (passedTests.has(testName)) {
      return;
    }

    // Update status as "Running..."
    setTestStatus((prevStatus) => [...prevStatus, `${testName} → Running...`]);

    // Simulate failure on Test 2 for the first run
    if (testName === 'Test 2' && index === 1) {
      setTestStatus((prevStatus) => [
        ...prevStatus,
        `${testName} → Failed!`,
      ]);

      // Simulate retry after failure
      setIsRetrying(true);
      await retryTest(testName);
      setIsRetrying(false);
    } else {
      // If the test passes, mark it as passed and add it to status
      setTestStatus((prevStatus) => [
        ...prevStatus,
        `${testName} → Passed!`,
      ]);
      setPassedTests((prevTests) => new Set(prevTests.add(testName)));
    }
  };

  // Function to retry a failed test
  const retryTest = async (testName) => {
    setTestStatus((prevStatus) => [
      ...prevStatus,
      `${testName} → Retrying...`,
    ]);

    // Simulate a delay for retry (e.g., 1 second)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setTestStatus((prevStatus) => [
      ...prevStatus,
      `${testName} → Passed!`,
    ]);
    setPassedTests((prevTests) => new Set(prevTests.add(testName)));
  };

  // Run all tests
  const runTests = async () => {
    setTestStatus([]); // Clear the previous test status
    setPassedTests(new Set()); // Reset passed tests
    setFinalStatus(''); // Reset final status

    for (let i = 0; i < tests.length; i++) {
      const testName = tests[i];
      await runTest(testName, i);
    }
    // Set final status after all tests are complete
    setFinalStatus('Tests Completed');
  };

  // Trigger tests dynamically when the component mounts
  useEffect(() => {
    runTests();
  }, []);

  // Function to handle page refresh
  const handleRefresh = () => {
    runTests(); // Call runTests to restart the tests
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>TestNG-like Test Flow Simulation</h1>
      <div style={styles.buttonContainer}>
        <button onClick={handleRefresh} style={styles.button}>
          Retry Tests
        </button>
      </div>
      <div>
        <h2 style={styles.subHeader}>Test Status:</h2>
        <ul style={styles.statusList}>
          {testStatus.map((status, index) => (
            <li key={index} style={styles.statusItem}>
              {status}
            </li>
          ))}
        </ul>
      </div>
      {isRetrying && <p style={styles.retryMessage}>Retrying failed test...</p>}
      <h3 style={styles.finalStatus}>{finalStatus}</h3>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',  // Updated box shadow for a more prominent effect
    maxWidth: '600px',
    margin: '50px auto',
    textAlign: 'center',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  subHeader: {
    fontSize: '1.5rem',
    color: '#444',
  },
  statusList: {
    listStyleType: 'none',
    padding: '0',
  },
  statusItem: {
    fontSize: '1.1rem',
    color: '#555',
    marginBottom: '8px',
    textAlign: 'left',
  },
  retryMessage: {
    fontSize: '1rem',
    color: '#f39c12',
  },
  finalStatus: {
    fontSize: '1.3rem',
    color: '#2ecc71',
    marginTop: '20px',
  },
};

export default TestNGSimulation;
