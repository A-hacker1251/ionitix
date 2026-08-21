const fs = require('fs');
const path = require('path');

const files = [
  'announcements-table.tsx',
  'events-table.tsx',
  'faculty-table.tsx',
  'laboratories-table.tsx',
  'gallery-table.tsx',
  'achievements-table.tsx',
  'registrations-table.tsx'
];

files.forEach(file => {
  const filePath = path.join('src/components/admin', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('useEffect')) {
    content = content.replace('import { useState } from "react"', 'import { useState, useEffect } from "react"');
  }

  // Find all state variables initialized with useState
  const stateVars = [];
  const stateRegex = /const \[([a-zA-Z]+), set[a-zA-Z]+\] = useState/g;
  let match;
  while ((match = stateRegex.exec(content)) !== null) {
    if (!['loading', 'announcements', 'events', 'faculty', 'laboratories', 'gallery', 'achievements', 'registrations', 'deletingId', 'data', 'updatingId'].includes(match[1])) {
      stateVars.push(match[1]);
    }
  }

  // Find fetch function name
  const fetchMatch = content.match(/const (fetch[a-zA-Z]+) = async \(\) =>/);
  if (fetchMatch) {
    const fetchFn = fetchMatch[1];
    
    // Check if useEffect already exists for this fetch
    if (!content.includes(`useEffect(() => {\n    ${fetchFn}()`)) {
      const useEffectCode = `  useEffect(() => {
    ${fetchFn}()
  }, [${stateVars.join(', ')}])`;

      // Insert before handleDelete
      if (content.includes('  const handleDelete = async')) {
        content = content.replace(/  const handleDelete = async/, useEffectCode + '\n\n  const handleDelete = async');
      } else if (content.includes('  const handleStatusUpdate = async')) {
        content = content.replace(/  const handleStatusUpdate = async/, useEffectCode + '\n\n  const handleStatusUpdate = async');
      } else {
        content = content.replace(/  return \(/, useEffectCode + '\n\n  return (');
      }

      fs.writeFileSync(filePath, content);
      console.log('Patched', file, 'with dependencies', stateVars);
    } else {
      console.log('Already patched', file);
    }
  }
});
