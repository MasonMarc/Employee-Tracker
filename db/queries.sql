 
-- update employee role

SELECT 
    department.id, 
    department.name,
    COUNT(course_names.id) AS total_courses
FROM course_names
JOIN department ON course_names.department = department.id
GROUP BY department.id;