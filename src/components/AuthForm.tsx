import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const AuthForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For demo purposes, hardcoded admin check
    if (phone === "11968775853" && password === "3129242201") {
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
      toast.success("Login successful!");
      return;
    }

    // Here you would typically make an API call to authenticate
    try {
      // Mock authentication for now
      localStorage.setItem("userRole", "volunteer");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="DDD + Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => navigate("/register")}
            >
              Don't have an account? Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};