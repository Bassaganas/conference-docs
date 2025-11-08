// Testing Fantasy integration for conference-docs
// This can be added to your conference-docs to capture workshop attendees

// Add this to your conference-docs when someone completes a workshop
export const addWorkshopAttendee = async (email, name, company = '') => {
  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiNWFjZTI1MjgwNWI1OWU5N2YxOGNlMTk3M2QyNzc2NWQ3OTQxNDBiY2U3YjIyNGE2MTc4OTU3NjU2YWVhZmJhYWI5YzA2YTlkNzY0NTcyYzMiLCJpYXQiOjE3NjA4MDQ5MTkuNjgxNjg1LCJuYmYiOjE3NjA4MDQ5MTkuNjgxNjg3LCJleHAiOjQ5MTY0Nzg1MTkuNjc3NzI0LCJzdWIiOiIxODgxNzQ2Iiwic2NvcGVzIjpbXX0.cA7u1WV7ieibBc0LJVnevydYINX5bN5282YgeTkUGllf851A8I3snb8hXwQwJ7f-biNnXYEG8noG79cjWNzzNDFX3FMfkgUUSsG6V8Dvt2LzxZ9RbumXZ4hcHCb-HZ-eraZDBgg_LULbZG6IJ26AEVQ3NW3xjVjEW4xI4VhFD6Axtujf1TVTeW841hYCSD8UgQ9NpARDZ5wr4Xe9k8cKeebPiO6cXrlVMm36D0X7bRVSIYpVzIobaTJ3iQSfUrdl7YrZyUu1Azryjg1jdFK-ETGkNCmggjFNw1YvLREMTZFXgVHCEJfNnX-IHZtRCD26hERh9xljaSE7H0BBLWx7wXXk3TV62o3rOv4m6Ps0ZqXWbvvCGFLqoqa4t_KRzRwOzHw0Ysc95XgEOrHtPnHZJUQPljDhH6tBqgMhcG96AnzSpdJx950lXmaq92LAXSc9qnAGSzcnIQ699ezexFFKnHauBYrjPHiYOQKHo1xefhBOAp7BIf0R7KwE01B1CTJ-Z-iOumcEIKPwwnNW-_IU8jzHCRCLZkJPN3lgrHvWowp6WVTke1HL3peZ8fiujMI7H1iD_3kJW82ASXlA42zqkyFkzUa7kNY0yXC0_P-ZeUiQT5lzUc2yL6022qbzGYlxYW5IK21SCZbiqhCwzBraNVKdCn9jWMsC97OeaqyNxoo`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        name: name,
        fields: {
          company: company,
          interest: 'Community' // This indicates they came from a workshop
        },
        groups: ["168714042640172501"], // TestingFantasy_WorkshopsRequests group
        tags: ['testing-fantasy', 'workshop-attendee', 'community']
      })
    });

    if (response.ok) {
      console.log('Workshop attendee added to MailerLite');
      return true;
    } else {
      console.error('Failed to add workshop attendee');
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
