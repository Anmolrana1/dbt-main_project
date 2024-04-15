{{ config(
    tags=['mart']
) }}

-- Extracting Required Fields
WITH 
count_proficiency AS (
    SELECT
        Empid,
        skillName,
        Proficiency
    FROM {{ ref('stg_skills_data') }}
)
SELECT
    s.skillName,
    COUNT(s.Empid) AS Num_of_emp,
    COUNT(CASE WHEN Proficiency = 'Expert' THEN 1 END) AS Expert,
    COUNT(CASE WHEN Proficiency = 'Advance' THEN 1 END) AS Advance,
    COUNT(CASE WHEN Proficiency = 'Intermidiate' THEN 1 END) AS Intermidiate,
    COUNT(CASE WHEN Proficiency = 'Beginner' THEN 1 END) AS Beginner
FROM
    count_proficiency s
GROUP BY
    s.skillName;
