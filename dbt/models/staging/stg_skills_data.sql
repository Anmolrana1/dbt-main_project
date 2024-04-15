{{ config(
    tags=['basic', 'staging']
) }}

-- Extracting Required Fields
WITH skills_data AS (
    SELECT
        Empid,
        skillName,
        Proficiency
    FROM {{ source('Skill_matrix', 'skills_data') }}
)
SELECT * from skills_data;