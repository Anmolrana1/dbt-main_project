{{ config(
    tags=['basic', 'staging']
) }}

-- Extracting Required Fields
WITH user_data AS (
    SELECT
        Empid,
        FirstName,
        LastName,
        Designation
    FROM {{ source('Skill_matrix', 'users_data') }}
)
SELECT * from user_data;