package com.telusko.springEcom.repo;

import com.telusko.springEcom.model.Order;
import com.telusko.springEcom.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {

   Optional<Order> findByOrderId(String orderId);

}
