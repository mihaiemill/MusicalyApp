package com.musically.user.mapping;

import com.musically.user.dto.UserDto;
import com.musically.user.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(User user);
    User toEntity(UserDto dto);
}