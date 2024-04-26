async function executeQuery(query) {
    try {
      const results = await window.api.executeQuery(query);
      console.log('Results:', results);
      return results;
    } catch (error) {
      console.error('ExecuteQuery ERROR:', error);
    }
  }
  
  async function sqlQuery(query) {
    try {
      const result = await window.api.sqlQuery(query);
      console.log('SQL Execution Result:', result);
    } catch (error) {
      console.error('SQL Query ERROR:', error);
    }
  }
  
export {executeQuery, sqlQuery};