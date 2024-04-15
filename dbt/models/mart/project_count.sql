{{ config(
    tags=['mart']
) }}

-- Extracting Required Fields
WITH project AS (
    SELECT
        Empid,
        projectType,
        Status
    FROM {{ ref('stg_project_data') }}
    where Status='Approved'
)
SELECT
    projectType as Project_Type,
    COUNT(Empid) AS Num_of_emp
FROM
    project 
GROUP BY
    projectType;
