// Testing Fantasy integration for conference-docs
// This can be added to your conference-docs to capture workshop attendees

const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWFjZTI1MjgwNWI1OWU5N2YxOGNlMTk3M2QyNzc2NWQ3OTQxNDBiY2U3YjIyNGE2MTc4OTU3NjU2YWVhZmJhYWI5YzA2YTlkNzY0NTcyYzMiLCJpYXQiOjE3NjA4MDQ5MTkuNjgxNjg1LCJuYmYiOjE3NjA4MDQ5MTkuNjgxNjg3LCJleHAiOjQ5MTY0Nzg1MTkuNjc3NzI0LCJzdWIiOiIxODgxNzQ2Iiwic2NvcGVzIjpbXX0.cA7u1WV7ieibBc0LJVnevydYINX5bN5282YgeTkUGllf851A8I3snb8hXwQwJ7f-biNnXYEG8noG79cjWNzzNDFX3FMfkgUUSsG6V8Dvt2LzxZ9RbumXZ4hcHCb-HZ-eraZDBgg_LULbZG6IJ26AEVQ3NW3xjVjEW4xI4VhFD6Axtujf1TVTeW841hYCSD8UgQ9NpARDZ5wr4Xe9k8cKeebPiO6cXrlVMm36D0X7bRVSIYpVzIobaTJ3iQSfUrdl7YrZyUu1Azryjg1jdFK-ETGkNCmggjFNw1YvLREMTZFXgVHCEJfNnX-IHZtRCD26hERh9xljaSE7H0BBLWx7wXXk3TV62o3rOv4m6Ps0ZqXWbvvCGFLqoqa4t_KRzRwOzHw0Ysc95XgEOrHtPnHZJUQPljDhH6tBqgMhcG96AnzSpdJx950lXmaq92LAXSc9qnAGSzcnIQ699ezexFFKnHauBYrjPHiYOQKHo1xefhBOAp7BIf0R7KwE01B1CTJ-Z-iOumcEIKPwwnNW-_IU8jzHCRCLZkJPN3lgrHvWowp6WVTke1HL3peZ8fiujMI7H1iD_3kJW82ASXlA42zqkyFkzUa7kNY0yXC0_P-ZeUiQT5lzUc2yL6022qbzGYlxYW5IK21SCZbiqhCwzBraNVKdCn9jWMsC97OeaqyNxoo';

// Fetch existing subscriber by email
// MailerLite API doesn't support email filter, so we try GET with email in path
// If that fails, we'll use POST-then-PUT strategy
const getExistingSubscriber = async (email) => {
  try {
    // Try GET with email in the path (some MailerLite API versions support this)
    const response = await fetch(`https://connect.mailerlite.com/api/subscribers/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      // MailerLite returns subscriber data directly or in result.data
      if (result.data) {
        return result.data;
      }
      return result;
    }
    
    // If GET fails, return null - we'll handle it in the main function
    return null;
  } catch (error) {
    // If GET doesn't work, we'll use POST-then-PUT strategy
    return null;
  }
};

// Merge fields intelligently - only update fields that have actual values
// Special handling for boolean interest fields: once true, stays true (OR logic)
const mergeFields = (existingFields = {}, newFields) => {
  const merged = { ...existingFields };
  
  // Special handling for boolean interest fields - use OR logic (once true, stays true)
  const interestFields = ['interest_community', 'interest_courses'];
  interestFields.forEach(field => {
    const existingValue = merged[field];
    const newValue = newFields[field];
    if (newValue === true || existingValue === true) {
      merged[field] = true;
    } else if (newValue !== undefined && newValue !== null && newValue !== '') {
      merged[field] = newValue;
    }
  });
  
  // For all other fields, only update if they have actual values (not empty strings, null, or undefined)
  Object.keys(newFields).forEach(key => {
    // Skip interest fields as they're handled above
    if (interestFields.includes(key)) {
      return;
    }
    const value = newFields[key];
    if (value !== undefined && value !== null && value !== '') {
      merged[key] = value;
    }
  });
  
  return merged;
};

// Merge arrays (groups, tags) without duplicates
const mergeArrays = (existing = [], newItems = []) => {
  const combined = [...existing, ...newItems];
  return Array.from(new Set(combined)); // Remove duplicates
};

// Add this to your conference-docs when someone completes a workshop
export const addWorkshopAttendee = async (email, name, company = '') => {
  try {
    // First, try to get existing subscriber
    let existingSubscriber = await getExistingSubscriber(email);
    
    // If GET didn't work, try POST first to get/create subscriber
    // MailerLite POST will return existing subscriber if email exists
    if (!existingSubscriber) {
      try {
        // Prepare minimal payload for initial POST
        const minimalPayload = {
          email: email,
          name: name || email.split('@')[0],
          fields: {},
          groups: ["168714042640172501"],
          tags: []
        };
        
        const postResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify(minimalPayload)
        });
        
        if (postResponse.ok) {
          const postResult = await postResponse.json();
          // If POST returns subscriber data, it means subscriber already existed
          existingSubscriber = postResult.data || postResult;
        }
      } catch (postError) {
        // If POST fails, continue with creating new subscriber
        console.log('POST attempt failed, will create new subscriber');
      }
    }
    
    // Prepare new fields - only include fields with actual values
    const newFields = {};
    if (company) newFields.company = company;
    newFields.interest_community = true; // This indicates they came from a workshop
    
    // Merge with existing fields
    const existingFields = existingSubscriber?.fields || {};
    const mergedFields = mergeFields(existingFields, newFields);
    
    // Merge groups
    const existingGroups = existingSubscriber?.groups?.map(g => g.id?.toString() || g.toString()) || [];
    const newGroups = ["168714042640172501"]; // TestingFantasy_WorkshopsRequests group
    const mergedGroups = mergeArrays(existingGroups, newGroups);
    
    // Merge tags
    const existingTags = existingSubscriber?.tags || [];
    const newTags = ['testing-fantasy', 'workshop-attendee', 'community'];
    const mergedTags = mergeArrays(existingTags, newTags);
    
    // Prepare the payload
    const payload = {
      email: email,
      name: name || existingSubscriber?.name || email.split('@')[0],
      fields: mergedFields,
      groups: mergedGroups,
      tags: mergedTags
    };
    
    // Use PUT to update if subscriber exists, POST to create if not
    const method = existingSubscriber ? 'PUT' : 'POST';
    const url = existingSubscriber 
      ? `https://connect.mailerlite.com/api/subscribers/${existingSubscriber.id}`
      : 'https://connect.mailerlite.com/api/subscribers';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log('Workshop attendee added to MailerLite');
      return true;
    } else {
      const errorData = await response.json();
      console.error('Failed to add workshop attendee:', errorData);
      return false;
    }
  } catch (error) {
    console.error('Error adding workshop attendee:', error);
    return false;
  }
};

// Example usage in your conference-docs:
// import { addWorkshopAttendee } from './utils/testing-fantasy-integration';
// 
// // When someone completes a workshop
// addWorkshopAttendee('user@example.com', 'John Doe', 'Acme Corp');
