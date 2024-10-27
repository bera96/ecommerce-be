import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../users/schemas/users.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'example 1': {
        value: {
          firstName: 'bera',
          lastName: 'bera',
          email: 'bera@gmail.com',
          password: 'a32df3fs3r',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Sign up',
    type: User,
  })
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: 'Login' })
  @ApiBody({
    type: class LoginDto {
      email: string;
      password: string;
    },
    examples: {
      'example 1': {
        value: { email: 'bera@gmail.com', password: 'a32df3fs3r' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login',
    type: User,
  })
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @ApiOperation({ summary: 'Refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Refresh tokens',
    type: User,
  })
  @ApiBearerAuth('JWT-AUTH')
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshTokens(@Req() req: any) {
    const userId = req.user.sub;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
