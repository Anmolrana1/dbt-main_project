{{ config(
    tags=['mart']
) }}


WITH employee AS(
    SELECT 
        Empid,
        concat(FirstName,' ',LastName) as Name
        FROM {{ ref('stg_users_data') }}
),
certificateTable AS (
    SELECT
        Empid,
        certificateName,
        Status
    FROM {{ ref('stg_certificate_data') }}
)
SELECT
    certificateName,
    COUNT(Empid) AS Num_of_emp,
    COUNT(CASE WHEN Status = 'Approved' THEN 1 END) AS Approved
FROM
    certificateTable 
GROUP BY
    certificateName;
