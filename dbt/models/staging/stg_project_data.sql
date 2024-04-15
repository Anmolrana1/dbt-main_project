{{ config(
    tags=['basic', 'staging']
) }}

-- Extracting Required Fields
WITH project_data AS (
    SELECT
        Empid,
        projectType,
        Status,
        role
    FROM {{ source('Skill_matrix', 'project_data') }}
)
SELECT * from project_data;