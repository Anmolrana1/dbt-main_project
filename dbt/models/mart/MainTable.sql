{{ config(
    tags=['mart']
) }}

WITH employee AS (
    SELECT 
        Empid,
        CONCAT(FirstName, ' ', LastName) AS Name
    FROM {{ ref('stg_users_data') }}
),

certificateTable AS (
    SELECT
        Empid,
        certificateName,
        Status
    FROM {{ ref('stg_certificate_data') }}
    WHERE Status = 'Approved'
),

skills AS (
    SELECT
        Empid,
        skillName
    FROM {{ ref('stg_skills_data') }}
),

project AS (
    SELECT
        Empid,
        projectType,
        Status
    FROM {{ ref('stg_project_data') }}
    WHERE Status = 'Approved'
)

SELECT
    e.Empid,
    e.Name,
    COUNT(DISTINCT c.certificateName) AS Number_of_certificates,
    COUNT(DISTINCT s.skillName) AS Number_of_skill,
    COUNT(DISTINCT d.projectType) AS Number_of_project
FROM
    certificateTable c
LEFT JOIN
    employee e ON c.Empid = e.Empid
LEFT JOIN
    skills s ON e.Empid = s.Empid
LEFT JOIN
    project d ON e.Empid = d.Empid
GROUP BY
    e.Empid,
    e.Name;
