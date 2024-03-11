function fetch_applicant (){
	fetch('data/applicant.json')
	.then(function(response) {
		return (response.json()); 
	})
	.then(function(data) {
		setResumeText(data);
		populatePage(data);
	});
}

function updateResume (){
	let data = JSON.parse(document.getElementById("resume_text").value);
        populatePage(data);
}

function setResumeText (applicant){
	document.getElementById("resume_text").value = JSON.stringify(applicant, null, 4);
}

function populatePage(applicant) {
	/* var applicant = JSON.parse(applicant_data); */
	var applicant_contact = "";
	var headlines         = '<div class="column-header">Headlines</div>';
	var experience        = '<div class="column-header">Experience</div>';
	var technologies      = '<div class="column-header">Languages / Tech</div>'; 
	var skills            = '<div class="column-header">Demonstrated Skills</div>'; 
	var education         = '<div class="column-header">Education</div>'; 
	var personal_values   = '<div class="column-header">Personal Values</div>'; 
	/* we can reuse these looping vars */
	var key, i, j, len, len_inner;

	/* Use some fun emojis for contact info */
	var icons_map = {
		"phone":        '<i class="fa fa-mobile" aria-hidden="true"></i>',
		"email":        '<i class="fa fa-inbox" aria-hidden="true"></i>',
		"github":       '<i class="fa fa-github" aria-hidden="true"></i>',
		"website":      '<i class="fa fa-laptop" aria-hidden="true"></i>',
		"location":     '<i class="fa fa-globe" aria-hidden="true"></i>',
		"check-square": '<i class="fa fa-check" aria-hidden="true"></i>',
	}

	/* 
	 * START Contact Info
	 * These fields end up inside of <div class="header">
	 */

	document.getElementById('person_name').innerHTML = applicant.person_name;
	document.getElementById('person_summary').innerHTML = applicant.person_summary;
	for (var key in applicant.contact_info) {
		if ( key === "address_full" ) { continue; }
		applicant_contact += icons_map[key] + " " + applicant.contact_info[key] + "&nbsp; &nbsp; ";	
	}
	document.getElementById('contact_info').innerHTML = applicant_contact;
	/* 
	 * END Contact Info
	 */

	/* 
	 * START Headlines
	 * Builds inside of <div class="headlines">:
	 * 
	 * Headline structure is this: 
	 *
	 * <div class="column-header">Headlines</div>
	 * <div class="headlines">
	 *   <div class="headline">
	 *     Headline 1
	 *     <div class="summary">Summary of stuff</div>
	 *   </div>
	 *   <div class="headline">
	 *     Headline 2
	 *     <div class="summary">Summary of more stuff</div>
	 *   </div>
	 * </div>
	 */
	len = applicant.headlines.length;
	for (i = 0; i < len; i++){
		headlines += '<div class="headline">';
		headlines += applicant.headlines[i].headline;
		headlines += '<div class="summary">'  + applicant.headlines[i].summary  + '</div>';
		headlines += '</div>';
	}
	document.getElementById('headlines').innerHTML = headlines;
	/* 
	 * END Headlines
	 */

	/* 
	 * START Experience
	 * Builds inside of <div class="experience">:
	 * 
	 * Experience structure is this: 
	 *
	 * <div class="column-header">Headlines</div>
	 * Experience
	 * <div class="row">
	 *   <div class="position_title">Title</div>
	 *   <div class="company">Company</div>
	 *   <div class="tenure">Tenure</div>
	 *   <div class="position_desc">>
	 *     Summary of role
	 *     <ul>
	 *       <li>responsiblity 1</li>
	 *       <li>responsiblity 2</li>
	 *       <li>responsiblity 3</li>
	 *     </ul>
	 *   </div>
	 * </div>
	 * <div class="row">
	 *   <div class="position_title">Title</div>
	 *   <div class="company">Company</div>
	 *   <div class="tenure">Tenure</div>
	 *   <div class="position_desc">
	 *     Summary of role
	 *     <ul>
	 *       <li>responsiblity 1</li>
	 *       <li>responsiblity 2</li>
	 *       <li>responsiblity 3</li>
	 *     </ul>
	 *   </div>
	 * </div>
	 */

	len = applicant.experience.length;
	for (i = 0; i < len; i++){
        	experience += '<div class="row">';
		experience += '<div class="position_title">' + applicant.experience[i].position_title + '</div>';
		experience += '<div class="company"> | ' + applicant.experience[i].company + '</div>';
		experience += '<div class="tenure"> ' + applicant.experience[i].tenure + '</div><br>';
		experience += '<div class="position_desc">';
		experience += '<div class="position_summary">' + applicant.experience[i].position_desc.position_summary + '</div>';
		experience += '<ul>';
		len_inner = applicant.experience[i].position_desc.results.length;
		for ( j =0; j < len_inner; j++ ) {
			experience += '<li>' + applicant.experience[i].position_desc.results[j] + '</li>';
		}
		experience += '</ul>';
		experience += '</div>'; /* end div position_desc */
        	experience += '</div>'; /* end div row */
	}
	document.getElementById('experience').innerHTML = experience;
	/* 
	 * END Experience
	 */

	/* 
	 * START Technologies
	 *
	 * Builds inside of <div class="technologies">:
	 * 
	 * Technologies is this: 
	 *
	 * <div class="column-header">Competencies</div>
	 * <div class="languages">
	 *   <div class="chart">
	 *     <div class="bar">
	 *       <div class="bar-#">Tech Name</div>
	 *       <div class="bar-#">Tech Name</div>
	 *       <div class="bar-#">Tech Name</div>
	 *     </div>
	 *   </div>
	 * </div>
	 */
	technologies += '<div class="chart">';

	len = applicant.competencies.technologies.length;
	for (i = 0; i < len; i++) {
		/* use the language strenght numbers to grab the right bar width */
		var bar_class = 'bar-' + applicant.competencies.technologies[i].proficiency;
		technologies += '<div class="bar">';
		technologies += '<div class="' + bar_class + '">' + applicant.competencies.technologies[i].tech_name + '</div>';
		technologies += '</div>'; /* end div bar */
	}
	technologies += '</div>'; /* end div chart */
	document.getElementById('technologies').innerHTML = technologies;
	/* 
	 * End Technologies
	 */

	/* 
	 * Start Personal Values
	 */

	/*
	 * Builds inside <div class="personal_values"> 
	 *
	 * Personal Values structure is this: 
	 *
	 * <div class="column-header">Personal Values</div>
	 * <ul>
	 *   <li>value 1</li>
	 *   <li>value 2</li>
	 *   <li>value 3</li>
	 * </ul>
	 *
	 */

	len = applicant.competencies.personal_values.length;
	for (i = 0; i < len; i++) {
		personal_values += '<div class="personal_value">';
		/* personal_values += icons_map['check'] + " " + applicant.competencies.personal_values[i]; 
		 */
		personal_values += icons_map['check-square'] + " " + applicant.competencies.personal_values[i]; 
		personal_values += '</div>';
	}
	document.getElementById('personal_values').innerHTML = personal_values;
	/* 
	 * End personal values
	 */

	/* 
	 * Start skills
	 */

	/*
	 * Builds inside <div class="skills"> 
	 *
	 * Skill structure is this: 
	 *
	 * <div class="column-header">Skills</div>
	 * <ul>
	 *   <li>skill 1</li>
	 *   <li>skill 2</li>
	 *   <li>skill 3</li>
	 * </ul>
	 *
	 */

	len = applicant.competencies.strengths.length;
	for (i = 0; i < len; i++) {
		skills += '<div class="skill">';
		skills += icons_map['check-square'] + " " + applicant.competencies.strengths[i];
		skills += '</div>';
	}
	document.getElementById('skills').innerHTML = skills;

	/*
	 * START Education
	 *
	 * Builds inside of <div class="education">:
	 * 
	 * Education structure is this: 
	 *
	 * <div class="column-header">Education</div>
	 * <div class="degree">BS in field</div>
	 * <div class="school">A. Univ.</div>
	 * <div class="degree_year">1970</div>
	 * <div class="school_honor">GPA, Magna Cum Laude, Awards</div>
	 */
	len = applicant.education.length;
	for (i = 0; i < len; i++) {
	        education += '<div class="degree">' + applicant.education[i].degree + " " + applicant.education[i].field + '</div>';
		education += '<div class="school">&nbsp; | ' + applicant.education[i].school + '</div>';
		education += '<div class="degree_year">' + applicant.education[i].degree_year + '</div><br>';
		education += '<div class="school_honor">' + applicant.education[i].school_honor.join(', ') + '</div>';
	}
	document.getElementById('education').innerHTML = education;
	/*
	 * END Education
	 */
}
