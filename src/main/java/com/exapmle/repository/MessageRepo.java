package com.exapmle.repos;

import com.exapmle.domain.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepo extends CrudRepository<Message, Long> { //позволяет получить полный список полей или найти по идентификатору
    List<Message> findByTag(String tag); // поиск по тэгу
    List<Message> findByText(String text);
}
