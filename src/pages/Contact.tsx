// import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert("Thank you for your message! We'll get back to you soon.");
//     setFormData({ name: "", phone: "", email: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Hero */}
//       <section className="pt-28 pb-12 bg-gradient-hero">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto text-center space-y-6">
//             <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
//               Get in Touch
//             </h1>
//             <p className="text-lg text-muted-foreground">
//               Have questions? We're here to help. Reach out to us anytime.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section className="py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Contact Info */}
//             <div className="space-y-8">
//               <div>
//                 <h2 className="text-2xl font-display font-bold text-foreground mb-6">
//                   Contact Information
//                 </h2>
//                 <p className="text-muted-foreground">
//                   We're available 7 days a week to assist you with buying or selling your car.
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
//                     <Phone className="w-6 h-6 text-primary-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Phone</h3>
//                     <a
//                       href="tel:+91+9098484153"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       +91 9098484153
//                     </a>
//                     <br />
//                     <a
//                       href="tel:+917018010668"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       +91 7018010668
//                     </a>

//                     <p className="text-sm text-muted-foreground">Mon-Sun, 9am-9pm</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-[hsl(142,70%,45%)] flex items-center justify-center flex-shrink-0">
//                     <MessageCircle className="w-6 h-6 text-[hsl(0,0%,100%)]" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">WhatsApp</h3>
//                     <a
//                       href="https://wa.me/919098484153"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       +91 9098484153
//                     </a>
//                     <br />
//                     <a
//                       href="https://wa.me/917018010668"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       +91 7018010668
//                     </a>
//                     <p className="text-sm text-muted-foreground">Chat with us instantly</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
//                     <Mail className="w-6 h-6 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Email</h3>
//                     <a
//                       href="mailto:prajapatimukatimotors@gmail.com"
//                       className="text-muted-foreground hover:text-primary transition-colors"
//                     >
//                       prajapatimukatimotors@gmail.com
//                     </a>
//                     <p className="text-sm text-muted-foreground">We reply within 24 hours</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
//                     <MapPin className="w-6 h-6 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Address</h3>
//                     <p className="text-muted-foreground">
//                       Rau Circle, Over Bridge
//                       <br />
//                       Near Baba Ram Dev Restaurant
//                       <br />
//                       Rau, 453331
//                       Indore Madhya Pradesh
//                       India
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
//                     <Clock className="w-6 h-6 text-foreground" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-foreground">Working Hours</h3>
//                     <p className="text-muted-foreground">
//                       Monday - Sunday: 9:00 AM - 9:00 PM
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Quick Action Buttons */}
//               <div className="flex gap-4">
//                 <Button variant="hero" size="lg" asChild>
//                   <a href="tel:+91+91 9098484153">
//                     <Phone className="w-5 h-5" />
//                     Call Now
//                   </a>
//                 </Button>
//                 <Button variant="whatsapp" size="lg" asChild>
//                   <a
//                     href="https://wa.me/91+91 9098484153"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <MessageCircle className="w-5 h-5" />
//                     WhatsApp
//                   </a>
//                 </Button>
//               </div>
//             </div>

//             {/* Contact Form */}
//             <div className="glass rounded-xl p-8">
//               <h2 className="text-2xl font-display font-bold text-foreground mb-6">
//                 Send us a Message
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input
//                       id="name"
//                       placeholder="Your name"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData((prev) => ({ ...prev, name: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input
//                       id="phone"
//                       type="tel"
//                       placeholder="+91 9098484153"
//                       value={formData.phone}
//                       onChange={(e) =>
//                         setFormData((prev) => ({ ...prev, phone: e.target.value }))
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="prajapatimukatimotors@gmail.com"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, email: e.target.value }))
//                     }
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="message">Message *</Label>
//                   <Textarea
//                     id="message"
//                     placeholder="Tell us how we can help..."
//                     rows={5}
//                     value={formData.message}
//                     onChange={(e) =>
//                       setFormData((prev) => ({ ...prev, message: e.target.value }))
//                     }
//                     required
//                   />
//                 </div>

//                 <Button type="submit" variant="hero" size="lg" className="w-full">
//                   Send Message
//                 </Button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Contact;


import { Phone, MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-white to-red-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-500">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-500">
                  We're available 7 days a week to assist you with buying or selling your car.
                </p>
              </div>

              <div className="space-y-6">

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href="tel:+919098484153" className="text-gray-500 hover:text-red-600">
                      +91 9098484153
                    </a>
                    <br />
                    <a href="tel:+917018010668" className="text-gray-500 hover:text-red-600">
                      +91 7018010668
                    </a>
                    <p className="text-sm text-gray-500">Mon-Sun, 9am-9pm</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <a href="https://wa.me/919098484153" target="_blank" className="text-gray-500 hover:text-red-600">
                      +91 9098484153
                    </a>
                    <br />
                    <a href="https://wa.me/917018010668" target="_blank" className="text-gray-500 hover:text-red-600">
                      +91 7018010668
                    </a>
                    <p className="text-sm text-gray-500">Chat with us instantly</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href="mailto:prajapatimukatimotors@gmail.com" className="text-gray-500 hover:text-red-600">
                      prajapatimukatimotors@gmail.com
                    </a>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-500">
                      Rau Circle, Over Bridge<br />
                      Near Baba Ram Dev Restaurant<br />
                      Rau, 453331<br />
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Working Hours</h3>
                    <p className="text-gray-500">
                      Monday - Sunday: 9:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Buttons */}
              <div className="flex gap-4">
                <Button size="lg" className="bg-red-500 hover:bg-red-700 text-white" asChild>
                  <a href="tel:+919098484153">
                    <Phone className="w-5 h-5" />
                    Call Now
                  </a>
                </Button>

                <Button size="lg" className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200" asChild>
                  <a href="https://wa.me/919098484153" target="_blank">
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl p-8 bg-white border border-red-100 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input value={formData.name}
                      onChange={(e)=>setFormData(p=>({...p,name:e.target.value}))}/>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input value={formData.phone}
                      onChange={(e)=>setFormData(p=>({...p,phone:e.target.value}))}/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={formData.email}
                    onChange={(e)=>setFormData(p=>({...p,email:e.target.value}))}/>
                </div>

                <div className="space-y-2">
                  <Label>Message *</Label>
                  <Textarea rows={5}
                    value={formData.message}
                    onChange={(e)=>setFormData(p=>({...p,message:e.target.value}))}/>
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white">
                  Send Message
                </Button>
              </form>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
