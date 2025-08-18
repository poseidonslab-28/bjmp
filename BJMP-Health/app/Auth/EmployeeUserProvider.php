<?php

namespace App\Auth;

use App\Models\Employee;
use Illuminate\Auth\EloquentUserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;

class EmployeeUserProvider extends EloquentUserProvider
{
    /**
     * Create a new database user provider.
     */
    public function __construct(HasherContract $hasher, string $model)
    {
        $this->model = $model;
        $this->hasher = $hasher;
    }

    /**
     * Validate a user against the given credentials.
     */
    public function validateCredentials(Authenticatable $user, array $credentials): bool
    {
        // For plain text password comparison (no hashing)
        return $credentials['password'] === $user->getAuthPassword();
    }
    
    /**
     * Retrieve a user by the given credentials.
     */
    public function retrieveByCredentials(array $credentials): ?Authenticatable
    {
        if (empty($credentials) || (count($credentials) === 1 && str_contains(array_keys($credentials)[0], 'password'))) {
            return null;
        }

        // Build query
        $query = $this->newModelQuery();

        foreach ($credentials as $key => $value) {
            if (str_contains($key, 'password')) {
                continue;
            }

            if (is_array($value)) {
                $query->whereIn($key, $value);
            } else {
                $query->where($key, $value);
            }
        }

        return $query->first();
    }
    
   
    public function updateRememberToken(Authenticatable $user, $token)
    {
        
    }
}
