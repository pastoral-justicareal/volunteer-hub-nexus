import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MINISTRIES = [
  "Café com mulheres",
  "Jiu-Jitsu",
  "Fundação Casa",
  "Casa Afegã",
  "Justiça Saúde",
  "Lavapés",
  "Abrigo",
  "Asilo",
  "Pastoral do menor",
];

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    ministries: [] as string[],
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (formData.ministries.length === 0) {
      toast.error("Please select at least one ministry");
      return;
    }

    try {
      // Here you would typically make an API call to register
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  const handleMinistryChange = (value: string) => {
    const ministry = value;
    setFormData(prev => ({
      ...prev,
      ministries: prev.ministries.includes(ministry)
        ? prev.ministries.filter(m => m !== ministry)
        : [...prev.ministries, ministry]
    }));
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="DDD + Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) =>
                setFormData({ ...formData, cpf: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Ministries</Label>
            <div className="grid grid-cols-2 gap-2">
              {MINISTRIES.map((ministry) => (
                <Button
                  key={ministry}
                  type="button"
                  variant={formData.ministries.includes(ministry) ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => handleMinistryChange(ministry)}
                >
                  {ministry}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
          <div className="text-center">
            <Button
              variant="link"
              className="text-sm"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};