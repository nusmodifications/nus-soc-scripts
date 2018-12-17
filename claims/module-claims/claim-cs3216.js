// ***********************************************************
// READ THE FOLLOWING BEFORE STARTING
// ***********************************************************
// 1. **IMPORTANT STEP** Change the properties in the config object in the next section.

// 2. Login to the portal at: https://mysoc.nus.edu.sg/~tssclaim/. Fill in your bank account information if you haven't.

// 3. Access the page titled 'Student Claim Submission' (https://mysoc.nus.edu.sg/~tssclaim/tutor/teach_claim.php?page=1) and click on
//    the 'Claim' button under your module. You should see the interface for you to enter details of the teaching claim activity.

// 4. Open the JS console (Ctrl/Cmd + Shift/Option + J), paste all the code in this file in the JS console and press enter. You should
//    see the message 'Claim object successfully created. Run c.makeAllClaims() to start.'.

// 5. Run the function c.makeAllClaims() . Wait until the alert 'All claims made!' is shown, then press 'OK'.

// 6. You will be brought back to the previous page. Click on the button 'Claim' again and verify that you have the right number of hours.

// To delete all claims on the page, run the function c.deleteAllClaims()


// ***********************************************************
// CONFIGURE THE RELEVANT PROPERTIES IN THE CONFIG OBJECT
// ***********************************************************

STUDENT_ID = prompt('Your NUSSTU ID, such as e0012345');

var config = {
  // Your NUSSTU ID, such as a0012345
  student_id: STUDENT_ID,
  // Module you are claiming hours for, such as CS1101S
  module: 'CS3216',
  // Format: YYYY/MM/DD
  // Note: Month is from 0-11, Date is from 1-31
  // This should be the semester's week 1. For AY15/16 Sem 1, it's Monday, Aug 10
  first_day_of_sem: new Date(2018, 7, 13),
  // In case you want to customize the duties field for each activity
  // Do not modify the keys
  duties: {
    'Assignment Marking': 'Graded CS3216 assignments',
    'Course Material Preparation': 'Prepared course materials',
    'Tutorial': 'Conducted workshop'
  },

  // The following function should return a list of claim objects that you want to make
  activities_list_fn: function () {
    var activities_list = [];

    // 2018: 24 hours of assignment marking and 6 hours of course material preparation!

    for (var week = 4; week <= 10; week += 2) {
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'FRIDAY',
        start_time: '1700',
        end_time: '1900'
      });
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'SUNDAY',
        start_time: '1500',
        end_time: '1900'
      });
    }

    activities_list.push({
      activity_type: Claim.COURSE_MATERIAL_PREPARATION, // Now called "Course Material Creation".
      week: 1,
      day: 'MONDAY',
      start_time: '0900',
      end_time: '1500'
    });

    return activities_list;
  }
};

// ***********************************************************
// DO NOT CHANGE THE BOTTOM UNLESS YOU KNOW WHAT YOU ARE DOING
// ***********************************************************

if (!STUDENT_ID) { // Chrome does not allow window.prompt() to run on an inactive tab.
  alert('Please modify STUDENT_ID in the code, or run STUDENT_ID="a0123456" before pasting and running the code.');
} else {
  var core_script = 'https://nusmodifications.github.io/nus-scripts/claims/claim.js';
  var c = undefined;
  $.getScript(core_script)
    .done(function () {
      c = new Claim(config);
    })
    .fail(function (jqxhr, settings, exception) {
      console.warn('Error loading script');
      console.warn(jqxhr);
      console.warn(exception);
    });
  // c.makeAllClaims();  // Run this after successful pasting of code! :)
}
