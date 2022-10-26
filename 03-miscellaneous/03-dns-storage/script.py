import dns.resolver

my_resolver = dns.resolver.Resolver()

my_resolver.nameservers = ["78.128.216.18", "78.128.246.141"] # ns1.mysterious-delivery.thecatch.cz and ns2.mysterious-delivery.thecatch.cz.

domain_name = "mysterious-delivery.tcc"

while(True):
    answer = my_resolver.resolve(domain_name, rdtype='NSEC')
    answer = answer.rrset.to_text().split(" ")

    domain_name = answer[4] # Next Domain Name
    available_types = answer[5:] # Type Bit Maps

    if("TXT" in available_types):
        try:
            txt = my_resolver.resolve(domain_name, rdtype="TXT")

            # Check if TXT contains "flag"
            if(txt.rrset.to_text().lower().find("flag") != -1): 
                print(txt.rrset.to_text())
        except:
            continue