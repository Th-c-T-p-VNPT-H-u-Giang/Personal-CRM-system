use personal_crm_system;

DROP TRIGGER IF EXISTS before_customer_types_delete;



DELIMITER //

CREATE TRIGGER before_customer_types_delete
BEFORE DELETE ON customer_types
FOR EACH ROW
BEGIN
    DECLARE cusTypeId VARCHAR(36);
    
    SET cusTypeId = OLD._id;
    
    -- Cập nhật giá trị mặc định cho trường customerTypesId của khách hàng
    UPDATE customers
    SET customerTypesId = '705a7bc8-d6f3-4df9-a0bf-f3fc67c133e8'
    WHERE customerTypesId = cusTypeId;
    
END //

DELIMITER ;


DELIMITER //
CREATE TRIGGER before_company_delete
BEFORE DELETE ON company_khs
FOR EACH ROW
BEGIN
    DECLARE compId VARCHAR(50);
    
    SET compId = OLD._id;
    
    -- Cập nhật giá trị mặc định cho trường customerTypesId của khách hàng
    UPDATE customer_works
    SET companyId = '8f7c1daf-9f04-46a3-b6f3-5f52fa25c60c'
    WHERE companyId = compId;
    
END //

DELIMITER ;

